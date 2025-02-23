'use client'

import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/user'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Loader2 } from 'lucide-react'
import { Database } from '@/lib/database.types'

export default function ProfilePage() {
  const { user, profile, loading, refreshProfile } = useUser()
  const [updating, setUpdating] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [name, setName] = useState(profile?.name || '')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { toast } = useToast()

  type UserUpdate = Partial<Database['public']['Tables']['users']['Row']>

  const uploadAvatar = async (file: File) => {
    try {
      setUploading(true)
      
      const fileExt = file.name.split('.').pop()
      const filePath = `${user!.id}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      const updateData: UserUpdate = {
        avatar_url: publicUrl || null,
        updated_at: new Date().toISOString(),
      }

      // @ts-ignore
      const { error: updateError } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', user?.id || '')

      if (updateError) throw updateError

      await refreshProfile()
      toast({
        title: 'Success',
        description: 'Avatar updated successfully.',
      })
    } catch (error) {
      console.error('Error uploading avatar:', error)
      toast({
        title: 'Error',
        description: 'Failed to upload avatar. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    uploadAvatar(e.target.files[0])
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setUpdating(true)
    try {
      const updateProfileData: UserUpdate = {
        name,
        updated_at: new Date().toISOString()
      }

      // @ts-ignore
      const { error } = await supabase
        .from('users')
        .update(updateProfileData)
        .eq('id', user.id || '')

      if (error) throw error

      await refreshProfile()
      toast({
        title: 'Success',
        description: 'Your profile has been updated.',
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setUpdating(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    router.push('/login')
    return null
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>
          Update your profile information and avatar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center mb-6">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.name || user.email} />
              <AvatarFallback>{profile?.name?.[0] || user.email?.[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-sm">{uploading ? 'Uploading...' : 'Change Avatar'}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{user.email}</p>
        </div>
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your display name"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Button type="submit" disabled={updating || uploading} className="w-full">
              {updating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Profile'
              )}
            </Button>
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleSignOut} 
              className="w-full"
              disabled={updating || uploading}
            >
              Sign Out
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
