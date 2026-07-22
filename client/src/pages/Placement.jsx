import { useState } from "react";
function Placement() {
    const [placementData, setPlacementData] = useState({
        company: "",
        role: "",
        status: "Applied",
        deadline: "",
        round_name: "",
    });
    return(
        <div>
            <h2>💼 Placement Tracker</h2>
            <input
                type="text"
                placeholder="Company"
            />
            <br/><br/>

            <input
                type="text"
                placeholder="Role"
            />
            <br/><br/>

            <select>
                <option>Applied</option>
                <option>OA</option>
                <option>Interview</option>
                <option>Selected</option>
                <option>Rejected</option>
            </select>
            <br/><br/>

            <input
                type="date"
            />
            <br/><br/>
            <input
                type="text"
                placeholder="Current Round"
            />
            <br/><br/>
            <button>
                Add Placement
            </button>
        </div>
    );
}

export default Placement;