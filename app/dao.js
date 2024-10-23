import { decodeJWT } from "../utils/decodeJWT";
const admin_access_token = process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET;

//----  LINES

export async function getLines(access_token) {
	const query = `
		query {
  			lines {
				id
    			name
				operator_id
  			}
		}
	`;

	const response = await fetchHasura(query, access_token);
	return await response.data.lines;
} 

export async function getLine(id, access_token) {
	const query = `
		query {
			lines_by_pk(id: ${id}) {
				id
				name
				operator_id
				current_position
				created_at
				turns {
					id
					user_id
					position
					joined_at
				}
			}
		}
	`;

	const response = await fetchHasura(query, access_token);
	return await response.data.lines_by_pk;
}

export async function getLinesAll(access_token) {
	const query = `
		query {
			lines {
				id
				name
				operator_id
				current_position
				created_at
				turns {
					id
					user_id
					position
					joined_at
				}
			}
		}
	`;

	const response = await fetchHasura(query, access_token);
	return await JSON.stringify(response.data.lines);
}


export async function getTurns(access_token) {
	const query = `
		query {
  			turns {
				id
    			line_id
				user_id,
				position
  			}
		}
	`;

	const response = await fetchHasura(query, access_token);
	return await response.data.turns;
}

export async function getManagedTurns(lineId, access_token) {
	const query = `
		query {
			turns(where: { line_id: { _eq: ${lineId} }}) {
				id
				line_id
				user_id
				position
			}
		}
	`;

	const response = await fetchHasura(query, access_token, admin_access_token);
	return await response.data.turns;
}

export async function addLine(name, access_token, user_id) {
	const query = `
		mutation {
			insert_lines(
				objects: {
						name: "${name}",
						operator_id: "${user_id}"
					}
				) {
					returning {
						id,
						position
				}
			}
		}
    `;

	const response = await fetchHasura(query, access_token);
	return await response;
}

export async function addTurn(line_id, access_token, previousPosition = undefined, nextPosition = undefined) {
	const queryGetPosition = `
		query {
			turns_aggregate(where: {line_id: {_eq: ${line_id}}}) {
				aggregate {
					count
				}
			}
		}
	`;

	const { data: { turns_aggregate: { aggregate: { count }} } } = await fetchHasura(queryGetPosition, access_token, admin_access_token);

	let newPosition;
	if (previousPosition !== undefined && nextPosition !== undefined) {
		newPosition = (previousPosition + nextPosition) / 2;
	} else {
		newPosition = count + 1;
	}

    const queryAddTurn = `
        mutation {
            insert_turns(
                objects: {
                    line_id: "${line_id}",
                    user_id: "${decodeJWT(access_token).payload['https://hasura.io/jwt/claims']['x-hasura-user-id']}",
                    position: "${newPosition}"
                }
            ) {
                returning {
                    id
                }
            }
        }
    `;

    const response = await fetchHasura(queryAddTurn, access_token);
    return await response.data;
}


export async function removeLine(id, access_token) {
	const query = `
		mutation {
			delete_lines_by_pk(id: ${id}) {
				id
			}
		}
	`;

	const response = await fetchHasura(query, access_token);
	return await response.data;
}

export async function removeTurn(id, access_token) {
	const query = `
		mutation {
			delete_turns_by_pk(id: ${id}) {
				id
			}
		}
	`;

	const response = await fetchHasura(query, access_token, admin_access_token);
	return await response.data;
}

export async function setCurrent(lineId, turnId, access_token) {	
    const query = `
        mutation {
            update_lines(where: {id: {_eq: ${lineId}}}, _set: {current_position: ${turnId}}) {
                returning {
                    id
                    current_position
                }
            }
        }
    `;

    const response = await fetchHasura(query, access_token, admin_access_token);
    return await response.data;
}

//---- HASURA

async function fetchHasura(query, access_token, admin_secret = null) {
	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${access_token}`,
	};

	if (admin_secret) {
		headers['x-hasura-admin-secret'] = admin_secret;
	};

	try {
		const response = await fetch(process.env.NEXT_PUBLIC_HASURA_ENDPOINT, {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query
			}),
		});

		const data = await response.json();

		if (data.errors) {
			console.log(data.errors);
		}

		return data;
	} catch (error) {
		console.log(error);
	}
}
