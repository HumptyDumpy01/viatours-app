import { getTours } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { filter, filterType, filterSearch, limit, project } = await request.json();
  const setLimit = limit ? limit : 9999;

  if (filter && !project) {
    const tours = await getTours(setLimit, { tags: { $in: filter } }, 0);
    return NextResponse.json({ tours });
  }

  if (filter && project) {
    const tours = await getTours(setLimit, { tags: { $in: filter } }, 0, project);

    return NextResponse.json({ tours });
  }

  if (filterType && !filterSearch) {

    const tours = await getTours(setLimit, { type: { $in: filterType } }, 0);

    return NextResponse.json({ tours });
  }

  if (filterSearch && !filterType) {

    const tours = await getTours(setLimit, { $text: { $search: filterSearch } }, 0);

    return NextResponse.json({ tours });
  }

  if (filterType !== `default` && filterSearch) {
    const tours = await getTours(setLimit, { type: { $in: filterType }, $text: { $search: filterSearch } }, 0);

    return NextResponse.json({ tours });
  }

  if (filterType === `default` && filterSearch) {
    const tours = await getTours(setLimit, { $text: { $search: filterSearch } }, 0);
    return NextResponse.json({ tours });
  }

  const tours = await getTours(setLimit, {}, 0);
  return NextResponse.json({ tours });
}