import { decodeJWT } from "../utils/decodeJWT";

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

export async function addLine(name, access_token) {
	const query = `
		mutation {
			insert_lines(
				objects: {
					name: "${name}",
					operator_id: "${decodeJWT(access_token).payload['https://hasura.io/jwt/claims']['x-hasura-user-id']}"
					}
				) {
					returning {
						id
				}
			}
		}
    `;

	const response = await fetchHasura(query, access_token);
	return await response;
}

export async function addTurn(line_id, access_token) {
	const queryGetPosition = `
		query {
			turns_aggregate(where: {line_id: {_eq: ${line_id}}}) {
			aggregate {
					count
				}
			}
		}
	`;

	const { data: { turns_aggregate: { aggregate: { count }} } } = await fetchHasura(queryGetPosition, access_token, process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET);
	const newPosition = count + 1;

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

	const response = await fetchHasura(query, access_token);
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
