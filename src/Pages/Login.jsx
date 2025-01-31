import useMutateLoginAdmin from "../Hooks/Admin/useMutateLoginAdmin";
import Form from "../UI/Form";

function Login() {
  const { loginAdminMutate, pendLogin } = useMutateLoginAdmin();

  async function Submit(e) {
    if (!e.email || !e.password) {
      console.error("Email and password are required.");
      return;
    }
    loginAdminMutate({ email: e.email, password: e.password });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo.png" // Replace with your logo path
            alt="Logo"
            className="h-16 w-auto"
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-primary-dark mb-6 text-center">
          Login to Your Account
        </h1>

        {/* Form */}
        <Form onSubmit={Submit}>
          {/* Email Input */}
          <Form.Input
            label="Email Address"
            name="email"
            type="email"
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter a valid email address",
              },
            }}
          />

          {/* Password Input */}
          <Form.PasswordInput
            label="Password"
            name="password"
            validation={{ required: "Please Enter the Password" }}
          />

          {/* Submit Button */}
          {/* <Form.ButtonSubmit>Login</Form.ButtonSubmit> */}
          <Form.ButtonSubmit isSubmitting={pendLogin}>Login</Form.ButtonSubmit>
        </Form>
      </div>
    </div>
  );
}

export default Login;
