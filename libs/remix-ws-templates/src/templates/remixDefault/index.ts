export default async () => {
  return {
    // @ts-ignore
    'creataChain/Context.sol': (await import('raw-loader!./creataChain/Context.sol')).default,
    // @ts-ignore
    'creataChain/ERC20.sol': (await import('raw-loader!./creataChain/ERC20.sol')).default,
    // @ts-ignore
    'creataChain/IERC20.sol': (await import('raw-loader!./creataChain/IERC20.sol')).default,
    // @ts-ignore
    'creataChain/IERC20Errors.sol': (await import('raw-loader!./creataChain/IERC20Errors.sol')).default,
    // @ts-ignore
    'creataChain/IERC20Metadata.sol': (await import('raw-loader!./creataChain/IERC20Metadata.sol')).default,
    // @ts-ignore
    'creataChain/SimpleERC20.sol': (await import('raw-loader!./creataChain/SimpleERC20.sol')).default,
     
    // @ts-ignore
    'contracts/1_Storage.sol': (await import('raw-loader!./contracts/1_Storage.sol')).default,
    // @ts-ignore
    'contracts/2_Owner.sol': (await import('raw-loader!./contracts/2_Owner.sol')).default,
    // @ts-ignore
    'contracts/3_Ballot.sol': (await import('raw-loader!./contracts/3_Ballot.sol')).default,
    // @ts-ignore
    'scripts/deploy_with_ethers.ts': (await import('!!raw-loader!./scripts/deploy_with_ethers.ts')).default,
    // @ts-ignore
    'scripts/deploy_with_web3.ts': (await import('!!raw-loader!./scripts/deploy_with_web3.ts')).default,
    // @ts-ignore
    'scripts/ethers-lib.ts': (await import('!!raw-loader!./scripts/ethers-lib.ts')).default,
    // @ts-ignore
    'scripts/web3-lib.ts': (await import('!!raw-loader!./scripts/web3-lib.ts')).default,
    // @ts-ignore
    'tests/Ballot_test.sol': (await import('raw-loader!./tests/Ballot_test.sol')).default,
    // @ts-ignore
    'tests/storage.test.js': (await import('!!raw-loader!./tests/storage.test.js')).default,
    // @ts-ignore
    'README.txt': (await import('raw-loader!./README.txt')).default,
    // @ts-ignore
    '.prettierrc.json': (await import('raw-loader!./.prettierrc')).default,
  }
}