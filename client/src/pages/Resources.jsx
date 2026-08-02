import { useState } from "react";
function Resources() {
    const [search, setSearch] = useState("");
    const resources = {
        React: {
            title: "React",
            difficulty: "Intermediate",
            time: "4 Hours",
            youtube: "https://www.youtube.com/results?search_query=react+course",
            docs:  "https://react.dev",
            practice: "https://leetcode.com",
            cheatsheet: "https://devhints.io/react",
        },
        DBMS: {
            title: "DBMS",
            difficulty: "Intermediate",
            time: "4 Hours",
            youtube: "https://www.youtube.com/results?search_query=dbms+course",
            docs: "https://www.geeksforgeeks.org/dbms/",
            practice:"https://www.hackerrank.com/domains/sql",
            cheatsheet: "https://www.geeksforgeeks.org/dbms-cheat-sheet/",
        },
        Java: {
            title: "Java",
            difficulty: "Intermediate",
            time: "4 Hours",
            youtube: "https://www.youtube.com/results?search_query=java+course",
            docs: "https://docs.oracle.com/en/java/",
            practice: "https://leetcode.com",
            cheatsheet: "https://quickref.me/java",
        },
        Python: {
            title: "Python",
            difficulty: "Beginner",
            time: "6 Hours",
            youtube: "https://www.youtube.com/results?search_query=python+course",
            docs: "https://docs.python.org/3/",
            practice: "https://leetcode.com",
            cheatsheet: "https://quickref.me/python",
        },
        SQL: {
            title: "SQL",
            difficulty: "Beginner",
            time: "5 Hours",
            youtube: "https://www.youtube.com/results?search_query=sql+course",
            docs: "https://dev.mysql.com/doc/",
            practice: "https://www.hackerrank.com/domains/sql",
            cheatsheet: "https://quickref.me/sql",
        },
    };

    const result = Object.values(resources).find(
        (resource) => 
            resource.title.toLowerCase() === search.toLowerCase()
    );

    return (
        <div>
            <h2>
                🔎 Resource Finder
            </h2>
            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                    marginBottom: "20px",
                }}
            >
                <button onClick={() => setSearch("React")}>
                    React
                </button>

                <button onClick={() => setSearch("DBMS")}>
                    DBMS
                </button>

                <button onClick={() => setSearch("Java")}>
                    Java
                </button>

                <button onClick={() => setSearch("Python")}>
                    Python
                </button>

                <button onClick={() => setSearch("SQL")}>
                    SQL
                </button>

            </div>

            <input
                type="text"
                placeholder="Search Subject"
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />
            <br/><br/>
            <p>
                Search:
                <b>
                    {
                        result ?
                        (
                            <div className="resource-card">
                                <h2>
                                    {result.title}
                                </h2>
                                <p>
                                    ⭐ Difficulty:{result.difficulty}
                                </p>
                                <p>
                                    ⏱ Estimated Time:{result.time}
                                </p>
                                <br/>
                                <hr/>
                                <button>
                                    Open Resources
                                </button>
                                <div className="resource-buttons">
                                    <p>
                                        <button
                                            onClick={() =>
                                                window.open(
                                                    result.youtube,
                                                    "_blank"
                                            )}
                                        >
                                            📺 YouTube
                                        </button>
                                    </p>
                                    <p>
                                        <button
                                            onClick={()=>
                                                window.open(
                                                    result.docs,
                                                    "_blank"
                                            )}
                                        >
                                            📘 Documentation
                                        </button>
                                    </p>
                                    <p>
                                        <button
                                            onClick={() => 
                                                window.open(
                                                    result.practice,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            💻 Practice
                                        </button>
                                    </p>
                                    <p>
                                        <button
                                            onClick={() => 
                                                window.open(
                                                    result.cheatsheet,
                                                    "_blank"
                                                )
                                            }
                                        >
                                            📝 Cheat Sheet
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )
                        :
                        (
                            <p>No resources found</p>
                        )  
                    }
                </b>
            </p>
        </div>

    );
}

export default Resources;