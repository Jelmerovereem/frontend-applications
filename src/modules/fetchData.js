export default async function fetchData(url) {
	const result = await fetch(url)
	const resultJSON = await result.json()
	return resultJSON
}