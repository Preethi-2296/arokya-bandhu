import { Heart, Shield, Users } from "lucide-react";

const HealthchatHeader = () => {
  return (
    <header className="bg-gradient-to-r from-primary to-primary-dark text-primary-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-foreground/10 p-2 rounded-lg">
              <Heart className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">HealthChat AI</h1>
              <p className="text-primary-foreground/80 text-sm">स्वास्थ्य सहायक | ସ୍ୱାସ୍ଥ୍ୟ ସହାୟକ | Health Assistant</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm">
              <Shield className="w-4 h-4" />
              <span>Verified by MoHFW</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Users className="w-4 h-4" />
              <span>50L+ Users Served</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HealthchatHeader;