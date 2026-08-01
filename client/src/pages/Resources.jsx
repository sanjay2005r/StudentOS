import { useState } from "react";
function Resources() {
    const [search, setSearch] = useState("");
    const resources = {
        React: {
            youtube: "https://www.youtube.com/results?search_query=react+course",
            docs:  "https://react.dev",
            practice: "https://leetcode.com",
            cheatsheet: "https://devhints.io/react",
        },
        DBMS: {
            youtube: "https://www.youtube.com/results?search_query=dbms+course",
            docs: "https://www.geeksforgeeks.org/dbms/",
            practice:"https://www.hackerrank.com/domains/sql",
            cheatsheet: "https://www.geeksforgeeks.org/dbms-cheat-sheet/",
        },
        Java: {
            youtube: "https://www.youtube.com/results?search_query=java+course",
            docs: "https://docs.oracle.com/en/java/",
            practice: "https://leetcode.com",
            cheatsheet: "https://quickref.me/java",
        },
    };

    const result = resources[search];

    return (
        <div>
            <h2>
                🔎 Resource Finder
            </h2>

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
                            <div>
                                <h3>
                                    📚 Resources
                                </h3>
                                <p>
                                    <a
                                        href={result.youtube}
                                        target="_blank"
                                    >
                                        📺 YouTube
                                    </a>
                                </p>
                                <p>
                                    <a
                                        href={result.docs}
                                        target="_blank"
                                    >
                                        📘 Documentation
                                    </a>
                                </p>
                                <p>
                                    <a
                                        href={result.practice}
                                        target="_blank"
                                    >
                                        💻 Practice
                                    </a>
                                </p>
                                <p>
                                    <a
                                        href = {result.cheatsheet}
                                        target="_blank"
                                    >
                                        📝 Cheat Sheet
                                    </a>
                                </p>
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