'use client'

import { useState, useEffect } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Search, X } from 'lucide-react'
import { Idea } from '@/types/idea'

interface IdeasFilterProps {
  ideas: Idea[]
  onFilterChange: (filtered: Idea[]) => void
}

export function IdeasFilter({ ideas, onFilterChange }: IdeasFilterProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [platform, setPlatform] = useState<string>('')

  useEffect(() => {
    const filtered = ideas.filter((idea) => {
      const matchesSearch =
        !searchTerm ||
        idea.idea.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (idea.target?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (idea.features?.toLowerCase() || '').includes(searchTerm.toLowerCase())

      const matchesPlatform = !platform || idea.platform === platform

      return matchesSearch && matchesPlatform
    })

    onFilterChange(filtered)
  }, [searchTerm, platform, ideas, onFilterChange])

  const clearFilters = () => {
    setSearchTerm('')
    setPlatform('')
  }

  const hasActiveFilters = searchTerm || platform

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search ideas, features, or target audience..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select
          value={platform}
          onValueChange={setPlatform}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Platforms" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Platforms</SelectItem>
            <SelectItem value="web">Web Application</SelectItem>
            <SelectItem value="mobile">Mobile App</SelectItem>
            <SelectItem value="both">Web & Mobile</SelectItem>
          </SelectContent>
        </Select>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="icon"
            onClick={clearFilters}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
