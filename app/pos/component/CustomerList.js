'use client';

import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { LuRefreshCw } from 'react-icons/lu';

import { Button } from '@/_components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/_components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/_components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/_components/ui/select';

import useAuth from '@/_hooks/useAuth';
import usePos from '@/_hooks/usePos';
import usePosUser from '@/_hooks/usePosUser';
import useStoreId from '@/_hooks/useStoreId';
import { cn } from '@/lib/utils';
import { getStore } from '../../_utils/pos/getStore';
import { createCustomer, getCustomers } from '../../_utils/pos/posCustomers';
import UserCreateModal from './modal/UserCreateModal';

const CustomerList = ({
  customervalue,
  setCustomerValue,
  warehousevalue,
  setWarehouseValue,
  storeId,
  setStoreId,
  hasInitialStoreId,
  setPage,
}) => {
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { dispatch } = usePos();
  const { authToken } = useAuth();
  const { posUser } = usePosUser();
  const { setUserStoreId } = useStoreId();

  // Set default customer ("Walk in Customer")
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await getCustomers(authToken);
        setCustomers(res.data);
        const defaultCustomer = res.data.find(
          (c) => c.name.trim() === 'Walk in Customer'
        )?.id;
        setCustomerValue(defaultCustomer);
      } catch (error) {
        console.error('Failed to fetch customers:', error);
      }
    };

    if (authToken) fetchCustomers();
  }, [authToken, setCustomerValue]);

  // Fetch warehouse list
  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const res = await getStore(authToken);
        setWarehouses(res.data);
      } catch (error) {
        console.error('Failed to fetch warehouse:', error);
      }
    };

    if (authToken && posUser) fetchWarehouse();
  }, [authToken, posUser]);

  // 🌟 Set initial store based on user type
  useEffect(() => {
    if (!posUser) return;

    if (String(posUser.store_id) === 'all') {
      setWarehouseValue('all');
      setStoreId('all');
      setUserStoreId('all');
    } else {
      setWarehouseValue(posUser.store_id);
      setStoreId(posUser.store_id);
      setUserStoreId(posUser.store_id);
    }
  }, [posUser]);

  const handleRefresh = () => {
    dispatch({ type: 'CLEAR_CART' });
    const walkInCustomer = customers.find(
      (c) => c.name.trim() === 'Walk in Customer'
    )?.id;
    setCustomerValue(walkInCustomer);
  };

  const handleValueChange = (value) => {
    setWarehouseValue(value);
    setStoreId(value);
    setUserStoreId(value);
    setPage(1);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await createCustomer(authToken, JSON.stringify(data));
      if (res.ok) {
        const newCustomer = await res.json();
        setCustomers((prev) => [...prev, newCustomer]);
        setCustomerValue(newCustomer.id);
        setIsOpen(false);
      } else {
        throw new Error('Failed to create customer');
      }
    } catch (error) {
      console.error('Failed to create customer:', error);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4 mb-5">
      {/* Customer Dropdown */}
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <div className="flex">
            <UserCreateModal
              submitHandler={submitHandler}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] text-xs font-normal justify-between px-3 py-2 border-[#E7E6EC] rounded-none rounded-r-md"
              >
                {customervalue
                  ? customers.find((c) => c.id === customervalue)?.name
                  : 'Walk in Customer'}
                <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
              </Button>
            </PopoverTrigger>
          </div>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search customer..." className="h-9" />
              <CommandList>
                <CommandEmpty>No Customer found.</CommandEmpty>
                <CommandGroup>
                  {customers.map((customer) => (
                    <CommandItem
                      key={customer.id}
                      className="text-[12px]"
                      value={customer.id.toString()}
                      onSelect={(currentValue) => {
                        setCustomerValue(
                          Number(currentValue) === customervalue
                            ? ''
                            : Number(currentValue)
                        );
                        setOpen(false);
                      }}
                    >
                      {customer.name}
                      <CheckIcon
                        className={cn(
                          'ml-auto h-4 w-4',
                          customervalue === customer.id
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Store Selector */}
      <div>
        <Select onValueChange={handleValueChange} value={warehousevalue}>
          <SelectTrigger className="w-[150px] text-xs font-normal justify-between px-3 py-2 border-[#E7E6EC]">
            <SelectValue placeholder="All Stores">
              {warehouses.find((wh) => wh.id === warehousevalue)?.name ||
                (warehousevalue === 'all' ? 'All Stores' : 'Select Store')}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {String(posUser?.store_id) === 'all' && (
                <SelectItem value="all">All Stores</SelectItem>
              )}
              {warehouses.map((wh) => (
                <SelectItem
                  key={wh.id}
                  value={wh.id}
                  disabled={
                    String(posUser?.store_id) !== 'all' &&
                    posUser?.store_id !== wh.id
                  }
                >
                  {wh.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Refresh Button */}
      <button
        onClick={handleRefresh}
        className="w-[34px] h-[34px] flex justify-center items-center bg-gray-200 rounded"
      >
        <LuRefreshCw />
      </button>
    </div>
  );
};

export default CustomerList;
