import React from 'react'

const UserCard = ({user}) => {
    return (
        <div className="card card-compact bg-base-300 w-96 shadow-xl">
            <figure>
                <img className='w-full '
                    src={user?.photoUrl}
                    alt="User" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{user?.firstName + user?.lastName}</h2>
                {user?.age&&user?.gender&&(<p>{user?.age+", " + user?.gender}</p>)}
                <p>{user?.about}</p>
                <div className="card-actions justify-center my-4 ">
                    <button className="btn btn-primary text-white">Ignore</button>
                    <button className="btn btn-secondary text-white">Intrested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard