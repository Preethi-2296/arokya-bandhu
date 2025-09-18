import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, Shield, User, FileText, Settings, Languages } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: (userData: any) => void;
}

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    gender: "",
    location: "",
    language: "",
    consent: false,
    domains: [] as string[],
    mode: "",
    medicineType: ""
  });

  const languages = [
    { value: "en", label: "English" },
    { value: "hi", label: "हिंदी (Hindi)" },
    { value: "or", label: "ଓଡ଼ିଆ (Odia)" }
  ];

  const healthDomains = [
    { value: "cardio", label: "Cardiology (हृदय स्वास्थ्य)", icon: "❤️" },
    { value: "neuro", label: "Neurology (न्यूरोलॉजी)", icon: "🧠" },
    { value: "diabetes", label: "Diabetes (मधुमेह)", icon: "🩸" },
    { value: "maternal", label: "Maternal Health (मातृ स्वास्थ्य)", icon: "🤱" },
    { value: "child", label: "Child Health (बाल स्वास्थ्य)", icon: "👶" },
    { value: "mental", label: "Mental Health (मानसिक स्वास्थ्य)", icon: "🧘" },
    { value: "general", label: "General Health (सामान्य स्वास्थ्य)", icon: "🏥" }
  ];

  const handleDomainToggle = (domain: string) => {
    setUserData(prev => ({
      ...prev,
      domains: prev.domains.includes(domain)
        ? prev.domains.filter(d => d !== domain)
        : [...prev.domains, domain]
    }));
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleComplete = () => {
    onComplete(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-medium">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Heart className="w-6 h-6 text-primary" />
            <CardTitle className="text-2xl">Welcome to HealthChat AI</CardTitle>
          </div>
          <p className="text-muted-foreground">Let's personalize your health assistant</p>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Basic Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={userData.name}
                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={userData.age}
                    onChange={(e) => setUserData(prev => ({ ...prev, age: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={userData.gender} onValueChange={(value) => setUserData(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male (पुरुष)</SelectItem>
                      <SelectItem value="female">Female (महिला)</SelectItem>
                      <SelectItem value="other">Other (अन्य)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="location">Location (District)</Label>
                  <Input
                    id="location"
                    placeholder="Enter your district"
                    value={userData.location}
                    onChange={(e) => setUserData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="language">Preferred Language</Label>
                <Select value={userData.language} onValueChange={(value) => setUserData(prev => ({ ...prev, language: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Privacy & Consent</h3>
              </div>
              
              <div className="bg-accent p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Data Privacy Agreement</h4>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Your health information will be kept confidential and secure</p>
                  <p>• Data is encrypted and complies with Indian health data regulations</p>
                  <p>• Information is used only to provide personalized health guidance</p>
                  <p>• You can update or delete your data anytime</p>
                  <p>• This service is not a substitute for professional medical advice</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="consent"
                  checked={userData.consent}
                  onCheckedChange={(checked) => setUserData(prev => ({ ...prev, consent: !!checked }))}
                />
                <Label htmlFor="consent" className="text-sm">
                  I agree to the privacy policy and consent to data processing for health assistance
                </Label>
              </div>

              <div className="bg-secondary/10 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-secondary" />
                  <span className="font-semibold text-secondary">Verified & Secure</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Content verified by Ministry of Health & Family Welfare, Government of India
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Health Domains</h3>
              </div>
              
              <p className="text-muted-foreground text-sm mb-4">
                Select areas you're interested in for personalized health information:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {healthDomains.map((domain) => (
                  <div
                    key={domain.value}
                    onClick={() => handleDomainToggle(domain.value)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      userData.domains.includes(domain.value)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{domain.icon}</span>
                      <div>
                        <p className="font-medium">{domain.label}</p>
                      </div>
                      <Checkbox
                        checked={userData.domains.includes(domain.value)}
                        className="ml-auto pointer-events-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Usage Preferences</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Interaction Mode</Label>
                  <p className="text-sm text-muted-foreground mb-3">How would you like to use HealthChat?</p>
                  <RadioGroup value={userData.mode} onValueChange={(value) => setUserData(prev => ({ ...prev, mode: value }))}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="personal" id="personal" />
                      <Label htmlFor="personal">Personal Mode - Tailored advice based on your profile</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public" id="public" />
                      <Label htmlFor="public">Public Mode - General health awareness information</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-medium">Medicine Preference</Label>
                  <p className="text-sm text-muted-foreground mb-3">What type of medical guidance do you prefer?</p>
                  <RadioGroup value={userData.medicineType} onValueChange={(value) => setUserData(prev => ({ ...prev, medicineType: value }))}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scientific" id="scientific" />
                      <Label htmlFor="scientific">Scientific Medicine (Allopathy) - Modern medical treatments</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="traditional" id="traditional" />
                      <Label htmlFor="traditional">Traditional Medicine (Ayurveda, Homeopathy) - Traditional healing methods</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Shield className="w-8 h-8 text-success" />
                <h3 className="text-xl font-semibold text-success">Setup Complete!</h3>
              </div>
              
              <div className="bg-success/10 p-6 rounded-lg">
                <h4 className="font-semibold mb-3">Your HealthChat Profile</h4>
                <div className="text-sm space-y-1 text-left">
                  <p><strong>Name:</strong> {userData.name}</p>
                  <p><strong>Age:</strong> {userData.age}</p>
                  <p><strong>Location:</strong> {userData.location}</p>
                  <p><strong>Language:</strong> {languages.find(l => l.value === userData.language)?.label}</p>
                  <p><strong>Health Interests:</strong> {userData.domains.length} domains selected</p>
                  <p><strong>Mode:</strong> {userData.mode}</p>
                  <p><strong>Medicine Type:</strong> {userData.medicineType}</p>
                </div>
              </div>

              <div className="bg-warning/10 p-4 rounded-lg">
                <p className="text-sm text-warning-foreground">
                  <strong>Important:</strong> This AI assistant provides health information and guidance but is not a substitute for professional medical advice. Please consult qualified healthcare providers for medical diagnosis and treatment.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Previous
              </Button>
            )}
            
            {step < 5 ? (
              <Button 
                onClick={nextStep} 
                disabled={
                  (step === 1 && (!userData.name || !userData.age || !userData.gender || !userData.location || !userData.language)) ||
                  (step === 2 && !userData.consent) ||
                  (step === 3 && userData.domains.length === 0) ||
                  (step === 4 && (!userData.mode || !userData.medicineType))
                }
                className="ml-auto"
              >
                Next
              </Button>
            ) : (
              <Button onClick={handleComplete} className="ml-auto bg-success hover:bg-success/90">
                Start Using HealthChat
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;