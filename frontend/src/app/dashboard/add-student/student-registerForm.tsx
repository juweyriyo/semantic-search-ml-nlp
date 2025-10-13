// client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Pencil, Trash2 } from "lucide-react";

// // ✅ Type declaration
// type User = {
//   ID: string;
//   name: string;
//   role: string;
// };

// export default function AddStudentPage() {
//   const [students, setStudents] = useState<User[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({ id: "", name: "", password: "" });
//   const [editId, setEditId] = useState<string | null>(null);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/get-users");
//       setStudents(res.data);
//     } catch (err) {
//       console.error("❌ Failed to fetch students", err);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       if (editId) {
//         await axios.put(http://localhost:8000/update-user/${editId}, formData);
//       } else {
//         await axios.post("http://localhost:8000/register-user", {
//           ...formData,
//           role: "student",
//         });
//       }
//       setFormData({ id: "", name: "", password: "" });
//       setEditId(null);
//       setShowForm(false);
//       fetchStudents();
//     } catch (err) {
//       console.error("❌ Submit failed", err);
//     }
//   };

//   const handleEdit = (user: User) => {
//     setFormData({ id: user.ID, name: user.name, password: "" });
//     setEditId(user.ID);
//     setShowForm(true);
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Are you sure to delete this student?")) return;
//     try {
//       await axios.delete(http://localhost:8000/delete-user/${id});
//       fetchStudents();
//     } catch (err) {
//       console.error("❌ Delete failed", err);
//     }
//   };

//   const filteredStudents = students
//     .filter((u) => u.role === "student")
//     .filter((u) =>
//       u.name.toLowerCase().includes(search.toLowerCase()) ||
//       u.ID.toLowerCase().includes(search.toLowerCase())
//     );

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Add New Student</h2>
//         {!showForm && (
//           <Button onClick={() => setShowForm(true)}>+ Add Student</Button>
//         )}
//       </div>

//       {showForm && (
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4 max-w-md bg-white p-4 rounded shadow"
//         >
//           <Input
//             placeholder="Student ID"
//             value={formData.id}
//             onChange={(e) => setFormData({ ...formData, id: e.target.value })}
//             required
//           />
//           <Input
//             placeholder="Full Name"
//             value={formData.name}
//             onChange={(e) =>
//               setFormData({ ...formData, name: e.target.value })
//             }
//             required
//           />
//           <Input
//             placeholder="Password"
//             type="password"
//             value={formData.password}
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
//             required={!editId}
//           />
//           <div className="flex gap-2">
//             <Button type="submit">{editId ? "Update" : "Register"}</Button>
//             <Button
//               type="button"
//               variant="ghost"
//               onClick={() => {
//                 setFormData({ id: "", name: "", password: "" });
//                 setEditId(null);
//                 setShowForm(false);
//               }}
//             >
//               Cancel
//             </Button>
//           </div>
//         </form>
//       )}

//       <div className="max-w-sm">
//         <Input
//           placeholder="Search by name or ID"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <table className="w-full table-auto bg-white rounded shadow">
//   <thead>
//     <tr className="bg-gray-100 text-left">
//       <th className="p-2">ID</th>
//       <th className="p-2">Name</th>
//       <th className="p-2">Role</th> {/* ✅ ADDED */}
//       <th className="p-2">Actions</th>
//     </tr>
//   </thead>
//   <tbody>
//     {filteredStudents.map((user) => (
//       <tr key={user.ID} className="border-t">
//         <td className="p-2">{user.ID}</td>
//         <td className="p-2">{user.name}</td>
//         <td className="p-2 capitalize">{user.role}</td> {/* ✅ ADDED */}
//         <td className="p-2 space-x-2">
//           <Button size="sm" onClick={() => handleEdit(user)}>
//             <Pencil className="w-4 h-4" />
//           </Button>
//           <Button
//             size="sm"
//             variant="destructive"
//             onClick={() => handleDelete(user.ID)}
//           >
//             <Trash2 className="w-4 h-4" />
//           </Button>
//         </td>
//       </tr>
//     ))}
//   </tbody>
// </table>

//     </div>
//   );
// }


