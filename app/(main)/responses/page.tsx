import ClientOnly from "@/components/client-only";
import ResponseClient from "./response-client";

export default function Responses() {
	return (
		<ClientOnly>
			<ResponseClient />
		</ClientOnly>
	);
}
