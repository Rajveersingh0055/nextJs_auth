export default function userProfile({params} :any){
    return (
            <div className="flex flex-col bg-[#000000] items-center justify-center min-h-screen py-2">
              <h1>Profile</h1>
              <hr />
             <p>Welcome to your profile page!</p>
             <span className="m-5 p-2 ml-2 flex items-center justify-center text-black rounded-md bg-[#65cbcd] ">{params.id}</span>
            </div>
    )
}