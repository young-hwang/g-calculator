import { Box, Container, Heading } from '@chakra-ui/react'

function App() {
  return (
    <Container maxW="container.md" py={8}>
      <Box textAlign="center">
        <Heading as="h1" size="xl" mb={8}>
          공학용 계산기
        </Heading>
        {/* 계산기 컴포넌트는 추후 구현 */}
      </Box>
    </Container>
  )
}

export default App
