import {useRouter} from "next/router";
import {defaultBotName} from "../utils/constants";

export default function BotName() {
   const router = useRouter();
   const botName = router.query.botName;
    return (
            <span>{botName || defaultBotName}</span>
    );
}
