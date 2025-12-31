import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Eye,
  EyeOff,
  Crown,
  ArrowLeft,
  Mail,
  Lock,
  Shield,
  Layers,
  Settings,
  Users,
  Database
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/app/store/features/auth/authThunk';
import { toast } from 'sonner';
import type { AppDispatch } from "@/app/store"; 

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [show2FA, setShow2FA] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      if (!show2FA) {
        setShow2FA(true);
      } else {
        // TODO: Add super admin authentication logic
        navigate('/');
        toast.success("Welcome back! You are logged in.",
          {
            action: {
              label: "Undo",
            },
          }
        );
      }
    } catch (error) {
      toast.error("ERROR")
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/30 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(168, 85, 247, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168, 85, 247, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12">
        {/* Back Button */}
        {/* <Button
          variant="ghost"
          className="mb-8 text-slate-400 hover:text-white hover:bg-white/5"
          onClick={() => navigate('/portal')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portal
        </Button> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding & Info */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur-lg opacity-50" />
                  <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl text-white">Reveal Super Admin</h1>
                  <p className="text-sm text-slate-400">Platform Management Console</p>
                </div>
              </div>

              <h2 className="text-4xl mb-4 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                Platform Command Center
              </h2>
              <p className="text-lg text-slate-400">
                Full platform control with client management, system configuration, and advanced analytics.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {[
                { icon: Users, text: 'Manage all client accounts & permissions' },
                { icon: Database, text: 'System-wide analytics & performance metrics' },
                { icon: Settings, text: 'Platform configuration & infrastructure control' },
                { icon: Layers, text: 'Multi-tenant management & white-labeling' },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-purple-500/20">
                    <feature.icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="text-slate-300">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-6 text-sm text-slate-500 pt-8 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Advanced Security</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span>2FA Required</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <Card className="relative overflow-hidden bg-slate-900/50 border-slate-800/50 backdrop-blur-xl p-8 lg:p-10">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="relative">
              {/* Form Header */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
                  <Crown className="w-3 h-3 text-purple-400" />
                  <span className="text-xs text-purple-300">Super Admin Access</span>
                </div>
                <h3 className="text-2xl text-white mb-2">
                  {show2FA ? 'Two-Factor Authentication' : 'Administrator Sign In'}
                </h3>
                <p className="text-sm text-slate-400">
                  {show2FA ? 'Enter the 6-digit code from your authenticator app' : 'Authorized personnel only'}
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                {!show2FA ? (
                  <>
                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="admin@reveal-platform.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 focus:border-purple-500 focus:ring-purple-500/20"
                          required
                        />
                      </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-slate-300">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 focus:border-purple-500 focus:ring-purple-500/20"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        className="border-slate-700 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                      <Label htmlFor="remember" className="text-sm text-slate-400 cursor-pointer">
                        Remember this device
                      </Label>
                    </div>
                  </>
                ) : (
                  <>
                    {/* 2FA Code Input */}
                    <div className="space-y-2">
                      <Label htmlFor="2fa" className="text-slate-300">Authentication Code</Label>
                      <Input
                        id="2fa"
                        type="text"
                        placeholder="000000"
                        maxLength={6}
                        value={twoFactorCode}
                        onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                        className="text-center text-2xl tracking-widest bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-600 focus:border-purple-500 focus:ring-purple-500/20"
                        required
                      />
                      <p className="text-xs text-slate-500 text-center">Enter the code from your authenticator app</p>
                    </div>

                    {/* Back Button */}
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full text-slate-400 hover:text-primary"
                      onClick={() => setShow2FA(false)}
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to login
                    </Button>
                  </>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50 transition-all"
                >
                  {show2FA ? 'Verify & Sign In' : 'Continue to 2FA'}
                </Button>

                {!show2FA && (
                  <>
                    {/* Warning */}
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-purple-300 mb-1">Security Notice</p>
                          <p className="text-xs text-slate-400">
                            All super admin actions are logged and monitored. Unauthorized access attempts will be reported.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-800" />
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-slate-900 px-2 text-slate-500">Authorized access only</span>
                      </div>
                    </div>

                    {/* Support */}
                    <p className="text-center text-sm text-slate-500">
                      Access issues?{' '}
                      <button type="button" className="text-purple-400 hover:text-purple-300 transition-colors">
                        Contact Security Team
                      </button>
                    </p>
                  </>
                )}
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}