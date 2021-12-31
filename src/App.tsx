import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import "./styles/global.scss";
import "./styles/sidebar.scss";
import "./styles/content.scss";

import { WatchMeProvider } from "./hooks/useWatchMe";

export function App() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <WatchMeProvider>
        <SideBar />
        <Content />
      </WatchMeProvider>
    </div>
  );
}
