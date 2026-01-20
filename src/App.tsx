import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router, Route, Switch, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "@/pages/Home";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Login from "@/pages/auth/Login"; // New
import Dashboard from "@/pages/admin/Dashboard";
import ProductsManager from "@/pages/admin/ProductsManager";
import OrdersManager from "@/pages/admin/OrdersManager";
import CustomersManager from "@/pages/admin/CustomersManager";
import BlogManager from "@/pages/admin/BlogManager";
import { useEffect } from "react";

// Private Route Wrapper
const PrivateRoute = ({ component: Component }: { component: any }) => {
  const [, setLocation] = useLocation();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    if (!isAdmin) {
      setLocation("/login");
    }
  }, [isAdmin, setLocation]);

  return isAdmin ? <Component /> : null;
};

function AppRouter() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        {/* Auth Route */}
        <Route path="/login" component={Login} />

        {/* Protected Admin Routes */}
        <Route path="/admin">
          {() => <PrivateRoute component={Dashboard} />}
        </Route>
        <Route path="/admin/products">
          {() => <PrivateRoute component={ProductsManager} />}
        </Route>
        <Route path="/admin/orders">
          {() => <PrivateRoute component={OrdersManager} />}
        </Route>
        <Route path="/admin/customers">
          {() => <PrivateRoute component={CustomersManager} />}
        </Route>
        <Route path="/admin/blog">
          {() => <PrivateRoute component={BlogManager} />}
        </Route>
        {/* Catch-all for admin subroutes */}
        <Route path="/admin/:any*">
          {() => <PrivateRoute component={Dashboard} />}
        </Route>

        {/* Public Routes */}
        <Route path="/:section?">
          {(params) => (
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow">
                <Home targetSection={params.section} />
              </main>
              <Footer />
            </div>
          )}
        </Route>
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <AppRouter />
          <Toaster theme="dark" position="bottom-right" />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
