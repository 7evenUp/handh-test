import {
  Button,
  Flex,
  Grid,
  Text,
  Box,
  Heading,
  Popover,
} from "@radix-ui/themes"

const App = () => {
  return (
    <Grid gap="8" columns="3" style={{ minHeight: "100vh" }}>
      <Flex direction="column" justify="center">
        <Box>
          <Heading size="7" weight="light" align="center">
            Battle logs
          </Heading>
        </Box>
      </Flex>
      <Flex direction="column" justify="center">
        <Flex gap="4" justify="between">
          <Box width="9" height="9">
            <Text>Player</Text>
          </Box>
          <Box width="9" height="9">
            <Text>Monster</Text>
          </Box>
        </Flex>
        <Button>Fight</Button>
      </Flex>
      <Flex direction="column" justify="center">
        <Popover.Root>
          <Popover.Trigger>
            <Button>Settings</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Text>1</Text>
            <Text>2</Text>
            <Popover.Close>
              <Button>Close</Button>
            </Popover.Close>
          </Popover.Content>
        </Popover.Root>
      </Flex>
    </Grid>
  )
}

export default App
