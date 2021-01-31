import { Connection, createConnection } from 'typeorm'
import { ChapterEntity } from './chapter.entity'
import { ChaptersService } from './chapters.service'

let chaptersService: ChaptersService
let conn: Connection
let chapters: ChapterEntity[]

beforeAll(async () => {
  conn = await createConnection()
  console.log({ conn })

  conn.runMigrations()
  const qr = conn.createQueryRunner()
  await qr.dropDatabase('test', true)
  await qr.createDatabase('test', true)
  await qr.release()
  const repo = conn.getRepository(ChapterEntity)
  chaptersService = new ChaptersService()

  // seed chapters
  chapters = await repo.save(
    repo.create([
      { title: 'Test 1', description: 'test 1' },
      { title: 'Test 2', description: 'test 2' },
    ]),
  )
})

afterAll(() => conn.close())

describe('ChaptersService', () => {
  it('should return chapters list', () => {
    return expect(chaptersService.getChapters()).resolves.toMatchObject(chapters)
  })
})
