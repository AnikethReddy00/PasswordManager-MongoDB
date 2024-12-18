import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
const Manager = () => {
    const ref = useRef();
    const ref2 = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setpasswordArray] = useState([]);
    const getPasswords = async() => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setpasswordArray(passwords);
        console.log(passwords)
    }
    
    useEffect(() => {
       getPasswords()
        
    }, []);

    const showpassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            ref2.current.type = 'text';
        } else {
            ref.current.src = "icons/eyecross.png";
            ref2.current.type = 'password';
        }
    };

    const savePassword = async() => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            setform({ site: "", username: "", password: "" });
            let res = await fetch("http://localhost:3000/" , {method : "POST" , headers : {"Content-Type" : "application/json"}, body : JSON.stringify({...form , id :uuidv4()})})
            
            toast('Password saved', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            toast('Error: Password length must be greater than 3', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    
    const deletePassword = async (id) => {
        console.log("Deleting password with id ", id)
        let c = confirm("Do you really want to delete this password?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            
            await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true, 
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

    }

    const editPassword = (id) => {
        setform(passwordArray.filter(item => item.id === id)[0]);
        setpasswordArray(passwordArray.filter(item => item.id !== id));
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="absolute top-0 z-[-2] h-screen w-screen rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
            <div className="md:mycontainer">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own password manager</p>

                <div className="flex flex-col items-center p-4 text-black gap-6">
                    <input placeholder='Enter website URL' type="text" name="site" id="site" value={form.site} className='rounded-full border border-green-500 w-full px-4 py-1' onChange={handleChange} />
                    <div className="flex w-full flex-col md:flex-row justify-between gap-10">
                        <input placeholder='Enter Username' type="text" name="username" id="username" className='rounded-full border border-green-500 w-full px-4 py-1' value={form.username} onChange={handleChange} />
                        <div className="relative">
                            <input ref={ref2} placeholder='Enter Password' type="password" name="password" id="password" className='rounded-full border border-green-500 w-full px-4 py-1' value={form.password} onChange={handleChange} />
                            <span className='absolute right-[1px] top-[2px] cursor-pointer' onClick={showpassword}>
                                <img ref={ref} className='p-2' width={30} src="icons/eye.png" alt="eye.png" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center items-center bg-green-500 rounded-full px-10 py-2 w-fit hover:bg-green-300 gap-2 border border-green-700'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No Saved Passwords</div>}
                    {passwordArray.length !== 0 &&
                        <table className="table-auto w-full overflow-hidden rounded-md">
                            <thead className='bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>

                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className='text-center w-32 py-2 border border-white'>
                                                <a href={item.site} target='_blank' rel="noreferrer">{item.site}</a>
                                            </td>
                                            <td className='text-center w-32 py-2 border border-white'>{item.username}</td>
                                            <td className='text-center w-32 py-2 border border-white'>{item.password}</td>
                                            <td className='text-center w-32 py-2 border border-white'>
                                                <span className='flex justify-center gap-6'>
                                                    <div onClick={() => { editPassword(item.id) }}>
                                                        <script src="https://cdn.lordicon.com/lordicon.js"></script>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/qnpnzlkk.json"
                                                            trigger="hover"
                                                            style={{ "width": "25px", "height": "25px" }}>
                                                        </lord-icon>
                                                    </div>
                                                    <div onClick={() => { deletePassword(item.id) }}>
                                                        <script src="https://cdn.lordicon.com/lordicon.js"></script>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/skkahier.json"
                                                            trigger="hover"
                                                            style={{ "width": "25px", "height": "25px" }}>
                                                        </lord-icon>
                                                    </div>
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    );
}
export default Manager