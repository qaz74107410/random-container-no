"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Copy, CheckCircle, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { generateContainerNumber, isValidContainerNumber } from "./utils/containerValidation";

interface ContainerNumber {
  number: string;
  copied: boolean;
}

interface PrefixConfig {
  [key: number]: string;
}

export default function Home() {
  const [containerNumbers, setContainerNumbers] = useState<ContainerNumber[]>([]);
  const [prefixConfig, setPrefixConfig] = useState<PrefixConfig>({});
  const [amount, setAmount] = useState(1);
  const [useCustomPrefix, setUseCustomPrefix] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    generateNumbers();
  }, []);

  const handlePrefixChange = (index: number, value: string) => {
    const updatedValue = value.toUpperCase().replace(/[^A-Z]/g, '');
    if (updatedValue.length <= 1) {
      setPrefixConfig(prev => ({
        ...prev,
        [index]: updatedValue
      }));
    }
  };

  const generateNumbers = () => {
    const numbers = Array(amount).fill(null).map(() => ({
      number: generateContainerNumber(prefixConfig),
      copied: false
    }));
    setContainerNumbers(numbers);
  };

  const handleCopy = async (index: number) => {
    await navigator.clipboard.writeText(containerNumbers[index].number);
    const newNumbers = [...containerNumbers];
    newNumbers[index] = { ...newNumbers[index], copied: true };
    setContainerNumbers(newNumbers);
    toast.success("Container number copied to clipboard!");
    setTimeout(() => {
      const resetNumbers = [...containerNumbers];
      resetNumbers[index] = { ...resetNumbers[index], copied: false };
      setContainerNumbers(resetNumbers);
    }, 2000);
  };

  const handleCopyAll = async () => {
    const allNumbers = containerNumbers.map(cn => cn.number).join('\n');
    await navigator.clipboard.writeText(allNumbers);
    toast.success("All container numbers copied to clipboard!");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Container Number Generator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Generate random container numbers instantly
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Switch
                  id="prefix-mode"
                  checked={useCustomPrefix}
                  onCheckedChange={setUseCustomPrefix}
                />
                <Label htmlFor="prefix-mode">Use custom prefix</Label>
              </div>
              
              {useCustomPrefix && (
                <div className="space-y-4">
                  <Label>Fixed Prefix Characters (leave empty for random)</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="space-y-2">
                        <Label htmlFor={`prefix-${index}`}>Position {index + 1}</Label>
                        <Input
                          id={`prefix-${index}`}
                          value={prefixConfig[index] || ''}
                          onChange={(e) => handlePrefixChange(index, e.target.value)}
                          className="font-mono text-center uppercase"
                          maxLength={1}
                          placeholder="?"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label>Number of containers</Label>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAmount(Math.max(1, amount - 1))}
                  disabled={amount <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-mono text-xl w-8 text-center">{amount}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setAmount(Math.min(10, amount + 1))}
                  disabled={amount >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {mounted && containerNumbers.map((cn, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
              >
                <span className="font-mono text-2xl font-bold tracking-wider text-gray-800 dark:text-gray-100">
                  {cn.number}
                </span>
                <Button
                  onClick={() => handleCopy(index)}
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  {cn.copied ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button
              onClick={generateNumbers}
              className="flex items-center space-x-2"
              size="lg"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Generate New</span>
            </Button>

            {amount > 1 && (
              <Button
                onClick={handleCopyAll}
                variant="outline"
                size="lg"
                className="flex items-center space-x-2"
              >
                <Copy className="w-5 h-5" />
                <span>Copy All</span>
              </Button>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            About Container Numbers
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            A container number consists of:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-gray-600 dark:text-gray-300">
            <li>4 letters (owner code) - can be customized with fixed positions</li>
            <li>6 numbers (serial number)</li>
            <li>1 check digit (calculated according to ISO 6346)</li>
          </ul>
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Tip:</strong> You can fix specific positions in the prefix while keeping others random.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}