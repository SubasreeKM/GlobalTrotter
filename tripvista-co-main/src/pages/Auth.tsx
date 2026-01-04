import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/* =======================
   LocalStorage Helpers
======================= */
const USERS_KEY = "globetrotter_users";
const AUTH_KEY = "globetrotter_auth";

const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  /* =======================
     Auto Redirect if Logged In
  ======================= */
  useEffect(() => {
    const user = localStorage.getItem(AUTH_KEY);
    if (user) {
      window.location.href = "/dashboard";
    }
  }, []);

  /* =======================
     AUTH FUNCTIONALITY
  ======================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    const users = getUsers();

    if (isLogin) {
      // 🔐 LOGIN
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        alert("Invalid email or password");
        return;
      }

      localStorage.setItem(AUTH_KEY, JSON.stringify(user));
      alert("Login successful!");
      window.location.href = "/dashboard";
    } else {
      // 📝 SIGN UP
      if (!name.trim()) {
        alert("Name is required");
        return;
      }

      const exists = users.some((u) => u.email === email);
      if (exists) {
        alert("Email already registered");
        return;
      }

      const newUser = { name, email, password };
      saveUsers([...users, newUser]);
      localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));

      alert("Account created successfully!");
      window.location.href = "/dashboard";
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1200')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-primary-foreground">
          <div className="flex items-center gap-3">
            <Globe className="h-10 w-10 text-secondary" />
            <span className="font-display text-3xl font-semibold">
              GlobeTrotter
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="font-display text-5xl leading-tight">
              Your journey begins <br />
              <span className="text-gradient-gold">with a single plan</span>
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-md">
              Create personalized itineraries and unforgettable travel
              experiences.
            </p>
          </motion.div>

          <span className="text-sm opacity-70">
            Trusted by 50,000+ travelers worldwide
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center gap-3 mb-8 lg:hidden">
            <Globe className="h-8 w-8 text-secondary" />
            <span className="font-display text-2xl font-semibold">
              GlobeTrotter
            </span>
          </div>

          <Card variant="flat" className="border-0 shadow-none">
            <CardHeader className="px-0">
              <CardTitle className="text-3xl">
                {isLogin ? "Welcome back" : "Create an account"}
              </CardTitle>
              <CardDescription>
                {isLogin
                  ? "Sign in to continue"
                  : "Start your journey today"}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      className="pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button type="submit" variant="gold" size="lg" className="w-full">
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                {isLogin ? "Don't have an account? " : "Already have one? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-secondary font-medium hover:underline"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
