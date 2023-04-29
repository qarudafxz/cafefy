import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			devOptions: {
				enabled: true,
			},
			includeAssets: ["android.png"],
			manifest: {
				name: "Cafefy",
				short_name: "Cafefy",
				description: "Cafe-Rating App",
				theme_color: "#131313",
				background_color: "#131313",
				start_url: "/",
				icons: [
					{
						src: "/android-launchericon-96-96.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/android-launchericon-192-192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "/android-launchericon-512-512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
				display: "standalone",
			},
		}),
	],
});
