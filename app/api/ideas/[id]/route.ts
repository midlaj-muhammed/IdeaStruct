import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.pathname.split('/').pop()
    if (!id) {
      return NextResponse.json(
        { error: 'No ID provided' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('ideas')
      .delete()
      .match({ id })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete idea' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting idea:', error)
    return NextResponse.json(
      { error: 'Failed to delete idea' },
      { status: 500 }
    )
  }
}
