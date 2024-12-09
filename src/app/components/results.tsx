import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Results({ username }: { username: string }) {
  // This is mock data. In a real application, this would be fetched from a backend.
  const recentFollowers = [
    { id: 1, username: 'john_doe', name: 'John Doe', avatar: '/avatars/john.jpg' },
    { id: 2, username: 'jane_smith', name: 'Jane Smith', avatar: '/avatars/jane.jpg' },
    { id: 3, username: 'mike_johnson', name: 'Mike Johnson', avatar: '/avatars/mike.jpg' },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Followers for @{username}</CardTitle>
        <CardDescription>Here are the most recent followers we found</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentFollowers.map((follower) => (
            <li key={follower.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={follower.avatar} alt={follower.name} />
                <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{follower.name}</p>
                <p className="text-sm text-gray-500">@{follower.username}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

