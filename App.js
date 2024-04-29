import SafeView from "./app/components/SafeView";
import LoginScreen from "./app/screens/LoginScreen";

export default function App() {
  return (
    <SafeView>
      <LoginScreen />
    </SafeView>
  );
}
