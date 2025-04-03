import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function RecentActivity() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Dr. John Moyo</p>
            <p className="text-sm text-muted-foreground">Checked out 5 units of Surgical Sutures</p>
            <p className="text-xs text-muted-foreground">Harare Central Hospital, Harare</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="outline">Checkout</Badge>
          <time className="text-sm text-muted-foreground">2h ago</time>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>SR</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Sarah Ndlovu</p>
            <p className="text-sm text-muted-foreground">Added 20 boxes of Nitrile Gloves (S)</p>
            <p className="text-xs text-muted-foreground">Bulawayo Central Hospital, Bulawayo</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="outline">Restock</Badge>
          <time className="text-sm text-muted-foreground">3h ago</time>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>MK</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Dr. Michael Khumalo</p>
            <p className="text-sm text-muted-foreground">Checked out 2 units of Blood Pressure Monitors</p>
            <p className="text-xs text-muted-foreground">Mutare Provincial Hospital, Manicaland</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="outline">Checkout</Badge>
          <time className="text-sm text-muted-foreground">5h ago</time>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>LP</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Lisa Mutasa</p>
            <p className="text-sm text-muted-foreground">Updated expiration date for Insulin vials</p>
            <p className="text-xs text-muted-foreground">Gweru Provincial Hospital, Midlands</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="outline">Update</Badge>
          <time className="text-sm text-muted-foreground">Yesterday</time>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center gap-4">
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar" />
            <AvatarFallback>RJ</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">Robert Chigumba</p>
            <p className="text-sm text-muted-foreground">Added 50 units of Disposable Syringes</p>
            <p className="text-xs text-muted-foreground">Masvingo Provincial Hospital, Masvingo</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="outline">Restock</Badge>
          <time className="text-sm text-muted-foreground">Yesterday</time>
        </div>
      </div>
    </div>
  )
}

