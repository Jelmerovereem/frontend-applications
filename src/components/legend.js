import updateData from "../modules/updateData.js";

export const Legend = () => {
	return (
		<>
	<select name="variable" className="variable-dropdown" onChange={updateData} >
		<option value="capacity">Capacity</option>
		<option value="paid/free">Paid/free</option>
	</select>
	<div className="bar-container">
		<div className="bar"></div>
		<div className="baraxis">
			<p className="first">0</p>
			<p className="last">1700</p>
		</div>
	</div>
	</>
	)
}