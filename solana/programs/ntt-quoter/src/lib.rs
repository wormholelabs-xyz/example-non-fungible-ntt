use anchor_lang::prelude::*;

mod processor;
pub(crate) use processor::*;
mod error;
mod state;

//because Anchor is bat-shit, we can't use aliased types in account definitions due to how
//  the derive accounts macro is implemented (and I don't have the time to fix it, create a PR,
//  and wait for a release):
//  https://github.com/coral-xyz/anchor/blob/216b56e26f5080ec652b098849e177ec560d602f/lang/derive/space/src/lib.rs#L110-L143
//nevertheless, I'll at least use these types to annotate variables
// type ChainId = u16;
// type UsdPrice = u64; //with 6 decimals (just like usdc)
// type GasPrice = u64; //in wei, i.e. 18 decimals
// type SolAmount = u64; //in lamports, i.e. 9 decimals
// type NativeAmount = u64; //in gwei, i.e. also uses 9 decimals

// !! update constant in TypeScript SDK when updating this value !!
const EVM_GAS_COST: u64 = 250_000; //TODO determine true gas cost on EVM

declare_id!("NttQuoter1111111111111111111111111111111111");
const WORMHOLE_TRANSCEIVER_INDEX: u8 = 0;

#[program]
pub mod ntt_quoter {
    use super::*;

    pub fn request_relay(ctx: Context<RequestRelay>, args: RequestRelayArgs) -> Result<()> {
        processor::request_relay(ctx, args)
    }

    pub fn close_relay(ctx: Context<CloseRelay>) -> Result<()> {
        processor::close_relay(ctx)
    }

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        processor::initialize(ctx)
    }

    pub fn set_assistant(ctx: Context<SetAssistant>) -> Result<()> {
        processor::set_assistant(ctx)
    }

    pub fn set_fee_recipient(ctx: Context<SetFeeRecipient>) -> Result<()> {
        processor::set_fee_recipient(ctx)
    }

    pub fn register_chain(ctx: Context<RegisterChain>, args: RegisterChainArgs) -> Result<()> {
        processor::register_chain(ctx, args)
    }

    pub fn update_sol_price(ctx: Context<UpdateSolPrice>, args: UpdateSolPriceArgs) -> Result<()> {
        processor::update_sol_price(ctx, args)
    }

    pub fn update_chain_prices(
        ctx: Context<UpdateChainPrices>,
        args: UpdateChainPricesArgs,
    ) -> Result<()> {
        processor::update_chain_prices(ctx, args)
    }

    pub fn update_chain_params(
        ctx: Context<UpdateChainParams>,
        args: UpdateChainParamsArgs,
    ) -> Result<()> {
        processor::update_chain_params(ctx, args)
    }
}
