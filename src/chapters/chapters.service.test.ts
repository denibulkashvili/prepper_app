import { Connection, createConnection } from 'typeorm'
import { ChapterEntity } from './chapter.entity'
import { ChaptersService } from './chapters.service'

describe('ChaptersService', () => {
  let chaptersService: ChaptersService
  let conn: Connection
  let chapters: ChapterEntity[]
  console.log(1)

  beforeAll(async () => {
    console.log(2)

    await createConnection()
    console.log(3)

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
    console.log(4)
  })

  afterAll(() => {
    console.log(6)

    return conn.close()
  })

  it('should return chapters list', () => {
    console.log(5)

    return expect(chaptersService.getChapters()).resolves.toMatchObject(chapters)
  })
})
