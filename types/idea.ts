export interface Idea {
  id: string
  user_id: string
  idea: string
  platform: 'web' | 'mobile' | 'desktop' | 'cross-platform'
  target_audience: string | null
  features: string | null
  blueprint: string
  created_at: string
  updated_at: string
}

export interface IdeaInput {
  idea: string
  platform: 'web' | 'mobile' | 'desktop' | 'cross-platform'
  target_audience?: string
  features?: string
  blueprint: string
}
