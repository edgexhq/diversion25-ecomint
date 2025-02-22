import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function faq() {
  return (
    <section>
      <h2 className="mb-4 text-2xl font-bold">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-semibold text-lg">
            How is the environmental impact calculated?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground/90 font-semibold text-base">
            A minimum of 50% of every NFT sale is automatically distributed
            between our partner environmental organizations. The impact is
            calculated based on their reported metrics for tree planting and
            conservation efforts.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-semibold text-lg">
            Can I choose which NGO my funds support?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground/90 font-semibold text-base">
            Yes! During checkout, you can select from partnered NGOs that align
            with your values, ensuring your contribution makes an impact where
            it matters most to you.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="font-semibold text-lg">
            Is EcoMint built on a sustainable blockchain?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground/90 font-semibold text-base">
            Yes! EcoMint prioritizes energy-efficient blockchains like Ethereum
            Sepolia to minimize carbon footprint.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="font-semibold text-lg">
            What wallets are supported on EcoMint?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground/90 font-semibold text-base">
            EcoMint supports popular crypto wallets like MetaMask, Trust Wallet,
            and Coinbase Wallet, ensuring secure transactions.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="font-semibold text-lg">
            What do I get in return for planting a tree or supporting an NGO?
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground/90 font-semibold text-base">
            NGOs may offer impact certificates, web tokens, or even a dedicated tree planted in your name,
            depending on the initiative.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
