import type { FC } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { BASE_URL } from 'services'

interface Props {
  title?: string
  description?: string
  image?: string
  ldJson?: any
  noSEO?: boolean
  keyword?: string
}

const SEO: FC<Props> = ({
  title,
  description = '개발자들이 모이는 채팅방. 카페에서 커피를 마시며 일상을 나누듯 개발자들과 코딩 일상을 나누어 보아요.',
  image = '',
  ldJson,
  noSEO = false
}) => {
  const { asPath } = useRouter()
  const TITLE = title ? `${title} - 커디` : '커디'
  const URL = BASE_URL + decodeURI(asPath)
  if (ldJson) ldJson['@context'] = 'https://schema.org'
  if (noSEO)
    return (
      <Head>
        <title>{TITLE}</title>
      </Head>
    )
  return (
    <Head>
      <title>{TITLE}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="keywords" />
      <meta property="og:title" content={TITLE} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={URL} />
      <meta property="og:image" content={image} />
      <meta property="twitter:title" content={TITLE} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:domain" content={URL} />
      {ldJson && (
        <script type="application/ld+json">{JSON.stringify(ldJson)}</script>
      )}
    </Head>
  )
}

export default SEO
