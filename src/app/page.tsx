// // import Link from 'next/link';
// // import { Button } from "@/components/ui/button";
// // import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

// // export default function Home() {
// //   return (
// //     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-4">
// //       <div className="text-center mb-10">
// //         <h1 className="text-6xl font-extrabold text-gray-900 mb-4 animate-bounce">
// //           Rent Wizard
// //         </h1>
// //         <p className="text-xl font-light text-gray-600">
// //           World's best rental agreement analyzer
// //         </p>
// //       </div>
      
// //       <Card className="max-w-md w-full shadow-lg rounded-lg bg-white">
// //         <CardHeader className="py-6">
// //           <CardTitle className="text-2xl font-semibold text-gray-800">
// //             Join Us Today
// //           </CardTitle>
// //           <p className="text-gray-500 text-sm mt-2">
// //             Sign up and get started with the most powerful contract analyzer.
// //           </p>
// //         </CardHeader>
// //         <CardContent>
// //           <p className="text-gray-600 text-lg mb-4">
// //             Analyze, manage, and optimize your contracts effortlessly with AI-driven insights.
// //           </p>
// //         </CardContent>
// //         <CardFooter className="flex flex-col items-center gap-4">
// //           {/* Link to sign-up and log-in pages */}
// //           <Link href="/auth/signup">
// //             <Button className="px-6 py-2 text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transition-all duration-200">
// //               Sign Up
// //             </Button>
// //           </Link>
// //           <Link href="/auth/signin">
// //             <Button className="px-6 py-2 text-indigo-600 bg-transparent border border-indigo-600 rounded-full hover:bg-indigo-50 transition-all duration-200">
// //               Log In
// //             </Button>
// //           </Link>
// //         </CardFooter>
// //       </Card>

// //       <footer className="mt-16 text-gray-500 text-sm">
// //         © 2024 Contract Wizard | All rights reserved.
// //       </footer>
// //     </div>
// //   );
// // }
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-purple-100 p-4">
      <div className="text-center mb-10">
        <h1 className="text-6xl font-extrabold text-purple-800 mb-4 animate-bounce">
          Rent Wizard
        </h1>
        <p className="text-xl font-light text-gray-600">
          World's best rental agreement analyzer
        </p>
      </div>
      
      <Card className="max-w-md w-full shadow-lg rounded-lg bg-white">
        <CardHeader className="py-6">
          <CardTitle className="text-2xl font-semibold text-purple-700">
            Join Us Today
          </CardTitle>
          <p className="text-gray-500 text-sm mt-2">
            Sign up and get started with the most powerful contract analyzer.
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-lg mb-4">
            Analyze, manage, and optimize your contracts effortlessly with AI-driven insights.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
          {/* Link to sign-up and log-in pages */}
          <Link href="/auth/signup">
            <Button className="px-6 py-2 text-white bg-purple-600 rounded-full shadow-md hover:bg-purple-700 transition-all duration-200">
              Sign Up
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button className="px-6 py-2 text-purple-600 bg-transparent border border-purple-600 rounded-full hover:bg-purple-50 transition-all duration-200">
              Log In
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <footer className="mt-16 text-gray-500 text-sm">
        © 2024 Contract Wizard | All rights reserved.
      </footer>
    </div>
  );
}


