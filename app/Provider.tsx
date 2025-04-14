import { store } from "@/Redux/Store";
import { Provider } from "react-redux";

interface Props {
  children: any;
}
export function Providers({ children }: Props) {
  return <Provider store={store}>{children}</Provider>;
}
