import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, navigate } from '@reach/router';


const AllPosts = (props) => {
    const [ allPosts, setAllPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/posts')
        .then((res) => {
            console.log(res.data);
            setAllPosts(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [])

    
    return(
                <div>
                    <h2></h2>
                    <table>
                        <tbody>
                            {
                                allPosts.map(( post, index) => (
                                <tr>
                                    <td  >
                                        <p> 
                                        <button onClick={() => navigate('/posts/' + post._id )}>
                                            {post.title} 
                                        </button> 
                                            
                                        </p>
                                    </td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
      
    )
}

export default AllPosts;
