function LoginForm() {
  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        placeholder="Username"
        className="border border-gray-300 rounded-md px-4 py-2"
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 rounded-md px-4 py-2 mt-4"
      />
      <button className="bg-primary text-white rounded-md px-4 py-2 mt-4">
        Login
      </button>
    </div>
  );
}
export default LoginForm;
