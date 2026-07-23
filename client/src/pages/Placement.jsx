import API from "../api/api";
import { useState, useEffect } from "react";



function Placement() {
    const [placementData, setPlacementData] = useState({
        company: "",
        role: "",
        status: "Applied",
        deadline: "",
        round_name: "",
    });

    const [placements, setPlacements] = useState([]);

    const handleChange = (e) => {
        setPlacementData({
            ...placementData,
            [e.target.name]: e.target.value,
        });
    };

    const addPlacement = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post(
                "/api/placements",
                placementData
            );
            alert(res.data.message);
            fetchPlacements();
            setPlacementData({
                company: "",
                role: "",
                status: "Applied",
                deadline: "",
                round_name: "",
            });
        }

        catch(error){
            console.log(error);
        }
    };

    const fetchPlacements = async () => {
        try {
            const res = await API.get(
                "/api/placements"
            );
            setPlacements(res.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPlacements();
    }, []);

    return(
        <form onSubmit={addPlacement}>
        
            <h2>💼 Placement Tracker</h2>
            <input
                type="text"
                name="company"
                value={placementData.company}
                onChange={handleChange}
                placeholder="Company"
            />
            <br/><br/>

            <input
                type="text"
                name="role"
                value={placementData.role}
                onChange={handleChange}
                placeholder="Role"
            />
            <br/><br/>

            <select
                name="status"
                value={placementData.status}
                onChange={handleChange}
            >
                <option>Applied</option>
                <option>OA</option>
                <option>Interview</option>
                <option>Selected</option>
                <option>Rejected</option>
            </select>
            <br/><br/>

            <input
                type="date"
                name="deadline"
                value={placementData.deadline}
                onChange={handleChange}
            />
            <br/><br/>

            <input
                type="text"
                name="round_name"
                value={placementData.round_name}
                onChange={handleChange}
                placeholder="Current Round"
            />
            <br/><br/>

            <button type="submit">
                Add Placement
            </button>
        </form>
    );
}

export default Placement;