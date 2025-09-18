import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AlertTriangle, 
  Info, 
  Calendar, 
  MapPin, 
  Siren, 
  Heart,
  Shield,
  Thermometer,
  Droplets
} from "lucide-react";

interface NewsAlertsProps {
  userData: any;
}

const NewsAlertsSection = ({ userData }: NewsAlertsProps) => {
  const [activeTab, setActiveTab] = useState("alerts");

  // Mock data - in real app, this would come from government APIs
  const emergencyAlerts = [
    {
      id: "1",
      title: "Dengue Outbreak Alert - Bhubaneswar",
      description: "Increased dengue cases reported in Bhubaneswar area. Take preventive measures immediately.",
      severity: "high",
      location: "Bhubaneswar, Odisha",
      timestamp: "2 hours ago",
      icon: <Siren className="w-5 h-5" />,
      action: "View Prevention Guide"
    },
    {
      id: "2",
      title: "Heatwave Warning",
      description: "Extreme heat conditions expected. Stay hydrated and avoid outdoor activities between 11 AM - 4 PM.",
      severity: "medium",
      location: userData.location || "Your area",
      timestamp: "4 hours ago",
      icon: <Thermometer className="w-5 h-5" />,
      action: "Heat Safety Tips"
    }
  ];

  const healthNews = [
    {
      id: "1",
      title: "New Vaccination Drive for Children",
      description: "Ministry of Health launches special vaccination campaign for children aged 5-12 years.",
      category: "Vaccination",
      date: "Today",
      source: "MoHFW",
      icon: <Shield className="w-5 h-5" />
    },
    {
      id: "2",
      title: "Monsoon Health Preparedness",
      description: "Essential tips to prevent water-borne diseases during monsoon season.",
      category: "Prevention",
      date: "Yesterday",
      source: "WHO India",
      icon: <Droplets className="w-5 h-5" />
    },
    {
      id: "3",
      title: "Heart Health Awareness Week",
      description: "Free cardiac screenings available at all district hospitals from June 15-22.",
      category: "Screening",
      date: "2 days ago",
      source: "National Health Mission",
      icon: <Heart className="w-5 h-5" />
    }
  ];

  const vaccineSchedule = [
    {
      vaccine: "COVID-19 Booster",
      dueDate: "2024-01-15",
      location: "PHC " + (userData.location || "Local"),
      status: "due",
      priority: "high"
    },
    {
      vaccine: "Seasonal Flu",
      dueDate: "2024-02-01",
      location: "District Hospital",
      status: "upcoming",
      priority: "medium"
    },
    {
      vaccine: "Hepatitis B (2nd dose)",
      dueDate: "2024-03-10",
      location: "Community Health Center",
      status: "scheduled",
      priority: "low"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-emergency";
      case "medium": return "text-warning";
      default: return "text-info";
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case "high": return "bg-emergency/10 border-emergency/20";
      case "medium": return "bg-warning/10 border-warning/20";
      default: return "bg-primary/10 border-primary/20";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "due": return "text-emergency";
      case "upcoming": return "text-warning";
      default: return "text-primary";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Health Updates & Alerts</h2>
        <Badge variant="outline">
          📍 {userData.location || "Location not set"}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alerts" className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="news" className="flex items-center space-x-2">
            <Info className="w-4 h-4" />
            <span>News</span>
          </TabsTrigger>
          <TabsTrigger value="vaccines" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Vaccines</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4">
            {emergencyAlerts.map((alert) => (
              <Card key={alert.id} className={`border-l-4 ${getSeverityBg(alert.severity)}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full bg-background ${getSeverityColor(alert.severity)}`}>
                        {alert.icon}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{alert.title}</CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{alert.location}</span>
                          <span>•</span>
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{alert.description}</p>
                  <Button size="sm" variant="outline">
                    {alert.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <div className="grid gap-4">
            {healthNews.map((news) => (
              <Card key={news.id} className="hover:shadow-soft transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                      {news.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{news.title}</CardTitle>
                        <Badge variant="outline">{news.category}</Badge>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                        <span>{news.source}</span>
                        <span>•</span>
                        <span>{news.date}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{news.description}</p>
                  <Button size="sm" variant="outline">
                    Read More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="vaccines" className="space-y-4">
          <div className="grid gap-4">
            {vaccineSchedule.map((vaccine, index) => (
              <Card key={index} className="hover:shadow-soft transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-full bg-secondary/10">
                        <Shield className="w-5 h-5 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{vaccine.vaccine}</h3>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>Due: {vaccine.dueDate}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span>{vaccine.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={vaccine.status === "due" ? "destructive" : "secondary"}
                        className={getStatusColor(vaccine.status)}
                      >
                        {vaccine.status.toUpperCase()}
                      </Badge>
                      <div className="mt-2">
                        <Button size="sm" variant="outline">
                          Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card className="bg-secondary/10 border-secondary/20">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Info className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-semibold text-secondary">Vaccination Reminder</p>
                  <p className="text-sm text-muted-foreground">
                    Enable SMS/WhatsApp notifications to get vaccination reminders. 
                    Visit cowin.gov.in for official scheduling.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NewsAlertsSection;