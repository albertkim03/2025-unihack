import { getUser } from '@/lib/lucia'
import {UserNavClient} from "@/components/user-nav-client"; // Assuming this is the server-side logic to get the user
export default async function UserNavServer() {
    const user = await getUser()

    return <UserNavClient user={user} />
}