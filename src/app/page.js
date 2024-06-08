import { DevChatBot } from "../components/DevChatBot";
import { Panel } from "../components/Panel";
import { WearableDevice } from "../components/WearableDevice";

export default function Home() {
  return (
    <main className="grid grid-cols-2 min-h-screen flex-col items-center justify-between p-24">
      <Panel id="wearableDeviceDisplayArea">
        <WearableDevice />
      </Panel>
      <Panel id="devChatBotInputOutputCheckArea">
        <DevChatBot />
      </Panel>
    </main>
  );
}
