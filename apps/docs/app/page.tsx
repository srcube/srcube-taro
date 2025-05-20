import { Button } from '@heroui/button'
import { Link } from '@heroui/link'
import { Snippet } from '@heroui/snippet'
import dayjs from 'dayjs'

export default function Home() {
  return (
    <>
      <div className="flex-grow mx-auto max-w-screen-xl w-full bg-transparent">
        <div className="grid grid-cols-12 gap-8 py-12">
          <div className="col-span-7 space-y-8">
            <h1 className="mt-12 text-5xl font-semibold leading-[1.2]">
              <p>
                Modular and extensible&nbsp;
                <span className="text-transparent bg-clip-text bg-gradient-to-t from-green-500 via-primary-500 to-primary-500">
                  UI library
                </span>
                &nbsp;for Taro.js
              </p>
            </h1>
            <p className="text-xl text-gray-400 dark:text-gray-600">
              Powered by React UI and Tailwind CSS, build mini apps with atomic design pattern.
            </p>
            <div className="flex justify-start gap-4">
              <Button
                as={Link}
                color="primary"
                href="/docs/guides/introduction"
                className="font-semibold dark:text-black"
              >
                Get Started
              </Button>
              <Snippet>
                pnpm add @srcube-taro/ui
              </Snippet>
            </div>
          </div>
          <div className="col-span-5"></div>
        </div>
      </div>
      <footer className="flex place-content-center py-6">
        <p className="text-sm opacity-40">
          ©&nbsp;
          {dayjs().year()}
          &nbsp;Srcube
        </p>
      </footer>
    </>
  )
}
