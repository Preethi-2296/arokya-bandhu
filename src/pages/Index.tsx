import { useState } from "react";
import HealthchatHeader from "@/components/HealthchatHeader";
import OnboardingFlow from "@/components/OnboardingFlow";
import ChatInterface from "@/components/ChatInterface";
import NewsAlertsSection from "@/components/NewsAlertsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Bell, Settings, User } from "lucide-react";

const Index = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("chat");

  const handleOnboardingComplete = (data: any) => {
    setUserData(data);
    setIsOnboarded(true);
  };

  if (!isOnboarded) {
    return (
      <div className="min-h-screen">
        <HealthchatHeader />
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HealthchatHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-120px)]">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="chat" className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat Assistant</span>
                </TabsTrigger>
                <TabsTrigger value="news" className="flex items-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span>News & Alerts</span>
                </TabsTrigger>
                <TabsTrigger value="profile" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="h-[calc(100%-60px)]">
                <Card className="h-full">
                  <ChatInterface userData={userData} />
                </Card>
              </TabsContent>

              <TabsContent value="news" className="h-[calc(100%-60px)] overflow-y-auto">
                <NewsAlertsSection userData={userData} />
              </TabsContent>

              <TabsContent value="profile" className="h-[calc(100%-60px)] overflow-y-auto">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Profile Settings</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Name</label>
                          <p className="text-muted-foreground">{userData?.name}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Age</label>
                          <p className="text-muted-foreground">{userData?.age}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Location</label>
                          <p className="text-muted-foreground">{userData?.location}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Language</label>
                          <p className="text-muted-foreground">{userData?.language}</p>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium">Health Domains</label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {userData?.domains?.map((domain: string) => (
                            <span key={domain} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                              {domain}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Mode</label>
                          <p className="text-muted-foreground capitalize">{userData?.mode}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Medicine Type</label>
                          <p className="text-muted-foreground capitalize">{userData?.medicineType}</p>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full">
                        <Settings className="w-4 h-4 mr-2" />
                        Update Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Quick Stats */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Active Alerts</span>
                    <span className="font-semibold text-emergency">2</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Due Vaccines</span>
                    <span className="font-semibold text-warning">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Health Score</span>
                    <span className="font-semibold text-success">Good</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3 text-emergency">Emergency Contacts</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Emergency</span>
                    <span className="font-mono">108</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Women Helpline</span>
                    <span className="font-mono">181</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mental Health</span>
                    <span className="font-mono">9152987821</span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-3 bg-emergency/10 border-emergency/20">
                  Call Emergency
                </Button>
              </CardContent>
            </Card>

            {/* Health Tip of the Day */}
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Health Tip</h3>
                <p className="text-sm text-muted-foreground">
                  💧 Drink at least 8 glasses of water daily to stay hydrated and maintain good health.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;