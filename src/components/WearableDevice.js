import Image from "next/image";

export function WearableDevice() {
  return (
    <div
      className="flex items-center justify-center rounded-xl m-4 p-4"
      id="wearable-device"
      style={{ height: 300, width: 300, backgroundColor: "#ffeac1" }}
    >
      <Image
        src="/images/Psyckitchen.jpeg"
        width={150}
        height={150}
        alt="Psyckitchen Logo"
      />
    </div>
  );
}
