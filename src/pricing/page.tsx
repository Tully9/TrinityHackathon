import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function Pricing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
      {/* Navigation Bar */}
      {/* <nav className="w-full bg-purple-600 text-white py-4">
        <div className="container mx-auto text-center font-bold text-lg">
          Rent Wizard Pricing Plans
        </div>
      </nav> */}

      <div className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        <p className="text-lg text-gray-600">
          Simple, transparent pricing for all types of renters.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {/* Basic Plan */}
        <Card className="shadow-lg rounded-lg bg-white">
          <CardHeader className="py-6 text-center">
            <CardTitle className="text-2xl font-semibold text-gray-800">Basic Plan</CardTitle>
            <p className="text-gray-500 mt-2">€10/month</p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">- 3 Contract Analyses</p>
            <p className="text-gray-600">- Basic AI Support</p>
            <p className="text-gray-600">- Email Alerts</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="px-6 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all duration-200">
              Checkout
            </Button>
          </CardFooter>
        </Card>

        {/* Standard Plan */}
        <Card className="shadow-lg rounded-lg bg-white">
          <CardHeader className="py-6 text-center">
            <CardTitle className="text-2xl font-semibold text-gray-800">Standard Plan</CardTitle>
            <p className="text-gray-500 mt-2">€20/month</p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">- 10 Contract Analyses</p>
            <p className="text-gray-600">- Priority AI Support</p>
            <p className="text-gray-600">- SMS Alerts</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="px-6 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all duration-200">
              Checkout
            </Button>
          </CardFooter>
        </Card>

        {/* Premium Plan */}
        <Card className="shadow-lg rounded-lg bg-white">
          <CardHeader className="py-6 text-center">
            <CardTitle className="text-2xl font-semibold text-gray-800">Premium Plan</CardTitle>
            <p className="text-gray-500 mt-2">€50/month</p>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">- Unlimited Contract Analyses</p>
            <p className="text-gray-600">- 24/7 AI Support</p>
            <p className="text-gray-600">- Premium Email & SMS Alerts</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="px-6 py-2 text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-all duration-200">
              Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>

      <footer className="mt-16 text-gray-500 text-sm">
        © 2024 Rent Wizard | All rights reserved.
      </footer>
    </div>
  );
}

