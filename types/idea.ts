export interface Idea {
  id: string
  created_at: string
  idea: string
  platform: 'web' | 'mobile' | 'both'
  target: string | null
  features: string | null
}

export interface IdeaInput {
  idea: string
  platform: 'web' | 'mobile' | 'both'
  target?: string
  features?: string
}
