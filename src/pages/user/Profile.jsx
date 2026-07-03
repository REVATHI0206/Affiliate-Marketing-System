import UserSidebar from "../../components/UserSidebar";
import UserNavbar from "../../components/UserNavbar";

export default function Profile() {
  const userName =
    localStorage.getItem("userName") || "User";
  const role =
    localStorage.getItem("role") || "user";

  return (
    <div className="flex">
      <UserSidebar />

    <div className="ml-64 flex-1 p-8 bg-slate-100 min-h-screen">
        <UserNavbar />

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <div className="bg-white p-6 rounded-xl shadow space-y-3">
          <p>
            <strong>Name:</strong> {userName}
          </p>

          <p>
            <strong>Role:</strong> {role}
          </p>
        </div>
      </div>
    </div>
  );
}